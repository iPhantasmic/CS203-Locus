package com.cs203.locus.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    private static final String[] AUTH_WHITELIST = {
            // -- swagger ui
            "/swagger-resources/**",
            "/swagger-ui.html#",
            "/v2/api-docs",
            "/webjars/**"
    };

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        // configure AuthenticationManager so that it knows from where to load
        // user for matching credentials
        // Use BCryptPasswordEncoder
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // Used for official security config
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/login", "/facebook/signin", "/google/signin").permitAll()
                // Below is for all Admin APIs + Bucket API
                .antMatchers("/admin/**", "/gcs/upload/vacc").authenticated()
                // Below is for protected JwtAuthenticationController APIs
                .antMatchers("/requestemail", "/password/**").authenticated()
                // Below is for all protected UserController APIs
                .antMatchers("/user/**").authenticated()
                // Below is for all protected Event APIs
                .antMatchers("/event/**").authenticated()
                // Below is for all protected Participant APIs
                .antMatchers("/participant/**").authenticated()
                // Below is for all protected Organiser APIs
                .antMatchers("/organiser/**").authenticated()
                // Below is for all protected EventTicket APIs
                .antMatchers("/ticket/**").authenticated()
                // Below is for all protected EventTicket APIs
                .antMatchers("/event/ticket/**").authenticated()
                // Below is for all unrestricted access APIs
                .antMatchers("/v2/api-docs",           // swagger
                        "/webjars/**",            // swagger-ui webjars
                        "/swagger-resources/**",  // swagger-ui resources
                        "/configuration/**",      // swagger configuration
                        "/*.html",
                        "/favicon.ico",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js",
                        "/swagger-ui.html#/").permitAll()
                .antMatchers(AUTH_WHITELIST).permitAll()
                .and().exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).
                and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).
                // Add a filter to validate the tokens with every request
                and().addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    /*THIS WILL BE USED FOR DEVELOPMENT ONLY*/
//    @Override
//    protected void configure(HttpSecurity httpSecurity) throws Exception {
//        // We don't need CSRF for this example
//        httpSecurity.cors().and().csrf().disable()
//                .authorizeRequests().antMatchers
//                ("/**").permitAll().and().
//                // all other requests need to be authenticated
//                // make sure we use stateless session; session won't be used to
//                // store user's state.
//                        exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
//                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//        // Add a filter to validate the tokens with every request
//        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity.ignoring()
                // USED FOR DEVELOPMENT ONLY
                // .antMatchers("/**");
                // Auth API
                .antMatchers("/authenticate")
                .antMatchers("/register")
                .antMatchers("/confirmemail")
                .antMatchers("/reset")
                .antMatchers("/resetpassword")
                .antMatchers("/validate")
                // OAuth API
                .antMatchers("/facebook/signin")
                .antMatchers("/google/signin")
                // User API
                .antMatchers("/user/forget/**")
                // Event API
                .antMatchers("/event/list");
    }
}
