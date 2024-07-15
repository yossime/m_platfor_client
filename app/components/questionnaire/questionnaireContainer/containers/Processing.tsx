import { FunctionComponent } from 'react';
import styles from '../questionnaireContainer.module.css';


const Processing:FunctionComponent = () => {
  	return (
    		<div className={styles.frameParent}>
      			<div className={styles.frameWrapper}>
        				<div className={styles.chooseAppsYoudLikeToAddParent}>
          					<div className={styles.chooseAppsYoud}>Finishing UP</div>
          					<div className={styles.giveYourSite}>Preparing your editor</div>
        				</div>
      			</div>
      			<div className={styles.groupWrapper}>
        				{/* <img className={styles.frameChild} alt="" src="Group 37.svg" /> */}
      			</div>
    		</div>);
};

export default Processing;


