import Image from 'next/image'
import Navbar from '../components/Navbar'
import cartoon from '../public/homeImage.png'

export default function Home() {

  return (
    <div>
      <Navbar />
      
      <div className = "px-16 flex-col flex">
        <div className = "flex-row flex items-center justify-center">
            <Image src = {cartoon} width = {800} height = {800}/>
            <div className = "flex-col flex ml-24">
                <span style = {{fontSize:61,}}>
                    We Take Care
                </span>
                <span style = {{fontSize:61,color:"#32BEA6"}}>
                    Of Your Events
                </span>
                <span style = {{fontSize:18,}} className = "mt-10">
                    Track COVID-19 vaccination status
                </span>
                <span style = {{fontSize:18,}}>
                    Keep up to date with changing COVID-19 guidelines
                </span>
                <span style = {{fontSize:18,}}>
                    Co-ordinate all yopur stakeholders on our platform
                </span>
                <div className = "w-full flex-row flex justify-between mt-10">
                    <div className = "border w-40 h-10 flex items-center justify-center rounded-md" style = {{backgroundColor:"#32BEA6",color:'white'}}>
                        Organize Event
                    </div>
                    <div className = "border w-40 flex items-center justify-center h-10 rounded-md " style = {{backgroundColor:"#757575",color:'white'}}>
                        Join Event
                    </div>
                </div>
            </div>
        </div>
        <div className = "w-full justify-between flex-row flex">
            <span style = {{fontSize:27}}>
                COVID-19 Guidelines Updates
            </span>
            <div style = {{fontSize:21}}>
                View All
            </div>
        </div>
      </div>
    </div>
  )
}