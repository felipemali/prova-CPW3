import { Link } from "react-router-dom"
import { Photo } from "../../models/Photo"
import styles from './styles.module.css'

type Props = {
    photo: Photo
}

//const CHARACTERS_LIMIT = 30
const WORDS_LIMIT = 10


const ResultCard = ({photo}: Props)=>{

  const sanitizeDescription = (description: string) =>{
    if(description){
      const words = description.split(' ')
      let counter = 0
      let index = 0
      const safeWords: string[] = []
      while(counter < WORDS_LIMIT && index < words.length){
        try{
          new URL(words[index])
          safeWords.push('(...)')
        }catch(error){
          safeWords.push(words[index])
          counter++
        }
        index++
      }
      return safeWords.join(' ')
    }
  }
    return (
      <div className={styles.card}>
        <Link to="/view" state={{photo}}>
        <img className={styles.cardThumb} src={photo.thumbURL} alt={photo.description} />
        </Link>
        

        {photo.description && (
          <h3 className={styles.cardDescription}>
            {/* {`${photo.description.substring(0, CHARACTERS_LIMIT)}...`} */}
           {sanitizeDescription(photo.description)}
            </h3>
        )}
       
      </div>
    )
}

export default ResultCard