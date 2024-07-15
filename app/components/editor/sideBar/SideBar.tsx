import { useState } from "react";
import { useProject } from "@/context/useProjectContext";
import { useProjectData } from "@/hooks/useProjectData";
import styles from "./SideBarStyles.module.css"
import { useEditor } from "@/context/useEditorContext";


const userId = "12345";
const environmentsList = ['Sea', 'Void', 'Urban', 'Nature'];
const layoutList = ['Lane', 'Ring', 'Stage'];
const boardsList = ['Screen', 'Board', 'Cell'];
const componentsList = ['Text', 'Image', 'Video'];
const MaterialsList = ['Marble', 'Hologram', 'Parquet', 'Neon', 'Gold'];



const SideBar = () => {

    // const { dataParameters, setDataParameters } = useEditor();
    const { dataParameters , setDataParameters } = useProject();

    const [currentEnvironment, setCurrentEnvironment] = useState<string | any >(dataParameters?.enviromentType);





    const changeEnvironment = (enviroment: string) => {

        const updatedData = { ...dataParameters, enviromentType: enviroment };
        setDataParameters(updatedData);
        setCurrentEnvironment(enviroment)
        console.log("zsfdgsgh",dataParameters)
    };

    const changeMaterial = (option: string) => {

    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.formGroup}>
                    <label>Environment:</label>
                    <div className={styles.buttonGroup}>
                        {environmentsList.map((enviroment, key) => (
                            <button
                                key={key}
                                className={`${styles.button} ${currentEnvironment === enviroment ? styles.active : ''}`}
                                onClick={() => changeEnvironment(enviroment)}
                            >
                                {enviroment}
                            </button>
                        ))}
                    </div>
                </div>

                {/* <div className={styles.formGroup}>
                    <label>layout:</label>
                    <div className={styles.buttonGroup}>

                        {layoutList.map((option) => (
                            <button
                                key={option}
                                className={`${styles.button} ${option === option ? styles.active : ''}`}
                                onClick={() => changeMaterial(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Board:</label>
                    <div className={styles.buttonGroup}>

                        {boardsList.map((option) => (
                            <button
                                key={option}
                                className={`${styles.button} ${option === option ? styles.active : ''}`}
                                onClick={() => changeMaterial(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>


                <div className={styles.formGroup}>
                    <label>Component:</label>
                    <div className={styles.buttonGroup}>

                        {componentsList.map((option) => (
                            <button
                                key={option}
                                className={`${styles.button} ${option === option ? styles.active : ''}`}
                                onClick={() => changeMaterial(option)}
                            >
                                {option}
                            </button>
                        ))}
                        <div style={{ alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 6, border: '1px black solid', justifyContent: 'center', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                            <div style={{ width: 24, height: 24, padding: 5, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <div style={{ width: 14, height: 14, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
                                    <div style={{ width: 14, height: 14, background: 'black' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles.formGroup}>
                    <label>Material:</label>
                    <div className={styles.buttonGroup}>

                        {MaterialsList.map((option) => (
                            <button
                                key={option}
                                className={`${styles.button} ${option === option ? styles.active : ''}`}
                                onClick={() => changeMaterial(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>





 */}

                {/* <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleSave}>
          Save
        </button>
      </div> */}
            </div>
        </>
    )
}



export default SideBar;