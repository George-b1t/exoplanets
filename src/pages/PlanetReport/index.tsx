import { useContext, useEffect, useState } from 'react'
import { Planet } from '../../components/Planet'
import { Dialog, DialogTitle } from '@mui/material'
import styles from './styles.module.scss'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { translate } from '../../services/translate'
import { Loading } from '../../components/Loading'

export function PlanetReport() {
  const {
    planetName,
    planetDescription,
    images,
    texture,
    idioma,
    translatedTexts,
    setTranslatedTexts,
    setIdioma,
  } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(false)
  const [loadingLabel, setLoadingLabel] = useState('Loading')

  const navigate = useNavigate()

  const [showDialog, setShowDialog] = useState(false)

  async function handleChangeLanguage() {
    if (idioma === 'en') {
      setLoadingLabel('Translating texts')
      setIsLoading(true)

      await translate({
        texts: [
          'Water',
          "Water is fundamental for a habitable planet. It sustains life, being a universal solvent crucial for biological processes. Its high heat capacity helps regulate temperatures, preventing extreme fluctuations that would otherwise render a planet uninhabitable. Water provides hydration for all organisms, a basic necessity for survival.\n\nMoreover, water bodies like oceans and lakes support diverse ecosystems, offering sustenance and oxygen for countless species. Water's role in climate regulation, through processes like evaporation and precipitation, maintains a stable environment.",
          'Earth · 70%',
          'Temperature',
          "Temperature is a crucial factor for a planet's habitability. It determines the presence of liquid water, essential for life as we know it.\n\nA stable temperature range supports diverse ecosystems and prevents extreme fluctuations that can disrupt life. This concept is central to the search for habitable exoplanets, as astronomers seek regions with the right temperature conditions around distant stars.",
          'Earth · 17.18 °C',
          'Nature',
          "Nature plays a pivotal role in determining a planet's habitability. It influences climate, weather patterns, and geological features, impacting temperature, landforms, and available resources. Biodiversity and ecosystems provide essential services like pollination and water purification, sustaining life.\n\nFurthermore, natural resources such as clean air, freshwater, and fertile soil are vital for both human and ecological well-being. Understanding and preserving the delicate balance of nature is critical for maintaining a habitable environment.",
          'Earth · 50%',
          'Surface',
          'The terrain surface is a pivotal factor in habitability, influencing climate, water availability, and natural hazards. Landforms shape temperature variations, affecting regional climates. Water bodies and aquifers are determined by terrain, impacting the availability of freshwater, essential for life.\n\nCertain terrains can be prone to natural hazards like earthquakes or landslides, which can compromise safety and habitability. Additionally, the quality of soil, often influenced by terrain, directly affects agriculture and food production.',
          'Earth · 50%',
          'Attributes',
          'Radius',
          'Earth · 6.371 km',
          'Mass',
          'Earth · 5.974 10^24 kg',
          'Density',
          'Earth · 5.5 g/cm^3',
          'Orbital Period',
          'days',
          'Earth · 365 days',
          'Generate',
          'Name of the planet',
          'Generating planet images',
          'Generating planet description',
          planetDescription,
        ],
      }).then((response) => {
        setTranslatedTexts(response)
      })
      setIsLoading(false)
      setIdioma('pt')
    } else {
      setIdioma('en')
    }
  }

  useEffect(() => {
    if (!planetDescription) {
      navigate('/')
    }

    const planet = document.getElementById('field-planet-main-planet-report')

    if (!planet) return

    planet.classList.add(styles.planetAnimated)
  }, [])

  return (
    <>
      {isLoading && <Loading label={loadingLabel} />}
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
          <div />
          <img src="/logo.png" alt="Planet Factory" />

          <button onClick={handleChangeLanguage}>
            {idioma === 'en' ? 'PT' : 'EN'}
          </button>
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
            {/* <button
            className={styles.fieldButtonShowImages}
            onClick={() => setShowDialog(true)}
          >
            <img src="/images.png" alt="Images icon" />
          </button> */}

            <img
              src="/planet-field-information.svg"
              alt="my-planet-description"
            />

            <div className={styles.fieldDescription}>
              <h1>{planetName}</h1>

              <p>{idioma === 'en' ? planetDescription : translatedTexts[26]}</p>

              {/* <button
              onClick={() => {
                navigate('/compare')
              }}
            >
              Next
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
