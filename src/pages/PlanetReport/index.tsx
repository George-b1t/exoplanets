import { useContext, useEffect, useState } from 'react'
import { Planet } from '../../components/Planet'
import { Dialog, DialogTitle } from '@mui/material'
import styles from './styles.module.scss'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

export function PlanetReport() {
  const { planetName, planetDescription, images, texture } =
    useContext(AppContext)

  const navigate = useNavigate()

  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    const planet = document.getElementById('field-planet-main-planet-report')

    if (!planet) return

    planet.classList.add(styles.planetAnimated)
  }, [])

  return (
    <div className={styles.container}>
      <Dialog
        onClose={() => {
          setShowDialog(false)
        }}
        open={showDialog}
      >
        <DialogTitle style={{ fontWeight: 500, fontSize: '1.8rem' }}>
          Planet Pictures
        </DialogTitle>

        <div
          style={{
            display: 'flex',
            padding: '0 1rem 1rem 1rem',
            gap: '1rem',
            width: 500,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image-${index}`}
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '1rem',
              }}
            />
          ))}
        </div>
      </Dialog>

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
          <button
            className={styles.fieldButtonShowImages}
            onClick={() => setShowDialog(true)}
          >
            <img src="/images.png" alt="Images icon" />
          </button>

          <img
            src="/planet-field-information.svg"
            alt="my-planet-description"
          />

          <div className={styles.fieldDescription}>
            <h1>{planetName}</h1>

            <p>{planetDescription}</p>

            <button
              onClick={() => {
                navigate('/compare')
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
