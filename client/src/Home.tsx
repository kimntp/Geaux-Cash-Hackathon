import styles from "./Home.module.css";
import Button from 'react-bootstrap/Button';


const brand_logo = "/images/spendemiclogo.png";


export default function Home() {

  return (
    <div className={styles.container} id ="begin">

      <img src= {brand_logo} className ={styles.logo} alt="logo icon"/>
    	<h2 className={styles.mainText}>Let's get this over with.</h2>
  		<h3 className={styles.subText}>You clearly need help managing your money.</h3>

			{/* The '!' is "non-null assertion" */}
			<Button variant="dark" className={styles.button} onClick={() => { document.getElementById('signup')!.scrollIntoView();}}>
      	Control Yourself
    	</Button>
    </div>
  )
}
