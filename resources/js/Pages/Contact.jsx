import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import { Head } from "@inertiajs/react"
import ContactContent from "@/Components/ContactContent"
const Contact = () => {
  return (
    <div>
        <Head title="Contact Us"/>
        <Header/>
        <ContactContent/>
        <Footer/>

    </div>
  )
}

export default Contact
