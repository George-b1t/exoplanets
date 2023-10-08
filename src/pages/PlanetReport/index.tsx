import { useContext, useEffect } from 'react'
import { Planet } from '../../components/Planet'
import styles from './styles.module.scss'
import { AppContext } from '../../context/AppContext'

export function PlanetReport() {
  const { planetName, planetDescription, images, texture } =
    useContext(AppContext)

  useEffect(() => {
    const planet = document.getElementById('field-planet-main-planet-report')

    if (!planet) return

    planet.classList.add(styles.planetAnimated)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header} id="logo-to-animate">
        <img src="/logo.png" alt="Planet Factory" />
      </div>

      <div className={styles.content}>
        <div className={styles.fieldPlanet}>
          <Planet
            size={360}
            name="main-planet-report"
            texture={'/textures/' + texture}
          />
        </div>

        <div className={styles.fieldBacgroundDescriptionImage}>
          <img
            src="/planet-field-information.svg"
            alt="my-planet-description"
          />

          <div className={styles.fieldDescription}>
            <h1>{planetName}</h1>

            <div className={styles.fieldImages}>
              {images.map((image, index) => (
                <img key={index} src={image} alt={`image-${index}`} />
              ))}
            </div>

            <p>{planetDescription}</p>

            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
