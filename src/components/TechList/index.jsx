import { useContext } from "react"
import { TechCard } from "../TechCard"
import { TechContext } from "../../providers/TechContext"
import { userContext } from "../../providers/UserContext"
import styles from "./styles.module.scss"


export const TechList = () => {
    const { tech } = useContext(userContext)

    return (
        <ul>
            {tech.map((techItem) => (

            <TechCard key={techItem.id} tech={techItem} />
            ))}
        </ul>
    )
}