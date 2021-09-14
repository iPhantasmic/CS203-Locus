package com.cs203.creditswees.security;

import com.cs203.creditswees.models.user.User;
import com.cs203.creditswees.repository.UserRepository;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil implements Serializable {

	private static final long serialVersionUID = 7308604211353057144L;
	// 18000
	public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

	@Value("${jwt.secret}")
	private String secret;

	@Autowired
	private UserRepository userRepository;

	private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);

	// Obtains token type to later determine signing key
	public String getTokenTypeUnsecure(String token) {
		final Claims claims = getAllClaimsFromTokenUnsecure(token);
		return claims.get("type").toString();
	}

	// Obtain username (subject) from JWT without checking signature
	public String getUsernameFromTokenUnsecure(String token) {
		final Claims claims = getAllClaimsFromTokenUnsecure(token);
		return claims.getSubject();
	}

	// Parses JWT without signature for above two functions
	private Claims getAllClaimsFromTokenUnsecure(String token) {
		int i = token.lastIndexOf('.');
		String withoutSignature = token.substring(0, i+1);
		try {
			return Jwts.parser().parseClaimsJwt(withoutSignature).getBody();
		} catch(ExpiredJwtException ex) {
			throw new BadCredentialsException("999");
		} catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
			LOGGER.error(ex.getMessage());
			throw new BadCredentialsException("INVALID_TOKEN");
		}

	}

	// Retrieve username from jwt token
	public String getUsernameFromToken(String token, String key) {
		return getClaimFromToken(token, key, Claims::getSubject);
	}

	// Retrieve expiration date from jwt token
	public Date getExpirationDateFromToken(String token, String key) {
		return getClaimFromToken(token, key, Claims::getExpiration);
	}

	// Supports above two functions
	public <T> T getClaimFromToken(String token, String key, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token, key);
		return claimsResolver.apply(claims);
	}

    //for retrieving any information from token we will need the correct key
	private Claims getAllClaimsFromToken(String token, String key) {
		return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
	}

	//check if the token has expired
	private Boolean isTokenExpired(String token, String key) {
		final Date expiration = getExpirationDateFromToken(token, key);
		return expiration.before(new Date());
	}

	//while creating the token -
	//1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
	//2. Sign the JWT using the HS512 algorithm and secret key.
	//3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
	//   compaction of the JWT to a URL-safe string

	// Generate login token for user
	public String generateAuthToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("type", "auth");
		String subject = userDetails.getUsername();
		// expiration is 18000000ms = 300 mins = 5 hours
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	// Generate password reset token
	public String generateResetToken(UserDetails userDetails) {
		final String key = userDetails.getPassword();
		Map<String, Object> claims = new HashMap<>();
		claims.put("type", "reset");
		String subject = userDetails.getUsername();
		// signing key set to password, so can only be used once. invalid after password change
		// expiration is 1800000ms = 30mins
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 100))
				.signWith(SignatureAlgorithm.HS512, key).compact();
	}

	// Generate email verification token
	public String generateEmailToken(String username) {
		// signing key set to createAt of user
		User user = userRepository.findByUsername(username);
		final String key = String.valueOf(user.getId() * 1733);
		Map<String, Object> claims = new HashMap<>();
		claims.put("type", "email");
		String subject = user.getUsername();
		// expiration is 1800000ms = 30mins
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 100))
				.signWith(SignatureAlgorithm.HS512, key).compact();
	}

	// Validate token
	public Boolean validateToken(String token, UserDetails userDetails) {
		String type = getTokenTypeUnsecure(token);
		String key = null;
		if ("auth".equals(type)) {
			key = secret;
		} else if ("email".equals(type)) {
			key = String.valueOf(userRepository.findByUsername(userDetails.getUsername()).getId() * 1733);
		} else if ("reset".equals(type)) {
			key = userDetails.getPassword();
		}

		try {
			// Checks that JWT has not been tampered with
			final Jws<Claims> claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token);
			final String username = getUsernameFromToken(token, key);
			return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, key));
		} catch(ExpiredJwtException ex) {
			throw new BadCredentialsException("999");
		} catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
			LOGGER.error(ex.getMessage());
			throw new BadCredentialsException("INVALID_TOKEN");
		}
	}
}