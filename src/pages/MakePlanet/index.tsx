import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Planet } from '../../components/Planet'
import { Slider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { Loading } from '../../components/Loading'
import { apiImages, apiPlanet } from '../../services/api'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

interface Option {
  name: string
  icon: string
  description: string
  slider: number
  max: number
  min: number
  metric_unit: string
  mark: {
    value: number
    label: string
  }
}

interface Attribute {
  name: string
  slider: number
  max: number
  min: number
  showMaxMin: (value: number) => string
  metric_unit: string
  mark: {
    value: number
    label: string
  }
}

export function MakePlanet() {
  const {
    planetName,
    setPlanetName,
    setPlanetDescription,
    setImages,
    setTexture,
    setPlanetInfo,
    setPlanetInfoAttr,
  } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(false)
  const [loadingLabel, setLoadingLabel] = useState('Loading')

  const [currentSelection, setCurrentSelection] = useState('Water')

  const [isNaming, setIsNaming] = useState(false)

  const navigate = useNavigate()

  function showMaxMinF(value: number) {
    return (value / 10).toString() + 'x'
  }

  const texturesList = [
    'wine-red.png',
    'water-blue.png',
    'violet.png',
    'velvet-red.png',
    'toxic-green.png',
    'snow-white.png',
    'shocking-pink.png',
    'rose-pink.png',
    'rose.png',
    'red.png',
    'pink.png',
    'moss-green.png',
    'light-red.png',
    'light-purple.png',
    'light-pink.png',
    'light-green.png',
    'light-brown.png',
    'green.png',
    'galaxy-purple.png',
    'dark-purple.png',
    'dark-pink.png',
    'dark-green.png',
    'dark-brown.png',
    'brown.png',
    'blood-red.png',
  ]

  const attributesData: Attribute[] = [
    {
      name: 'Radius',
      slider: 10,
      max: 25,
      min: 8,
      metric_unit: 'km',
      showMaxMin: showMaxMinF,
      mark: {
        label: 'Earth · 6.371 km',
        value: 10,
      },
    },
    {
      name: 'Mass',
      slider: 10,
      max: 76,
      min: 3,
      metric_unit: '10^24 kg',
      showMaxMin: showMaxMinF,
      mark: {
        label: 'Earth · 5.974 10^24 kg',
        value: 10,
      },
    },
    {
      name: 'Density',
      slider: 55,
      max: 78,
      min: 24,
      metric_unit: 'g/cm^3',
      showMaxMin: (v) => v.toString(),
      mark: {
        label: 'Earth · 5.5 g/cm^3',
        value: 55,
      },
    },
    {
      name: 'Orbital Period',
      slider: 365,
      max: 636,
      min: 4,
      metric_unit: 'days',
      showMaxMin: (v) => v.toString(),
      mark: {
        label: 'Earth · 365 days',
        value: 365,
      },
    },
  ]

  const [attributes, setAttributes] = useState(attributesData)

  const optionsData: Option[] = [
    {
      name: 'Water',
      icon: '/icons/water.png',
      description:
        "Water is fundamental for a habitable planet. It sustains life, being a universal solvent crucial for biological processes. Its high heat capacity helps regulate temperatures, preventing extreme fluctuations that would otherwise render a planet uninhabitable. Water provides hydration for all organisms, a basic necessity for survival.\n\nMoreover, water bodies like oceans and lakes support diverse ecosystems, offering sustenance and oxygen for countless species. Water's role in climate regulation, through processes like evaporation and precipitation, maintains a stable environment.",
      slider: 70,
      max: 80,
      min: 30,
      metric_unit: '%',
      mark: {
        label: 'Earth · 70%',
        value: 70,
      },
    },
    {
      name: 'Temperature',
      icon: '/icons/temperature.png',
      description:
        "Temperature is a crucial factor for a planet's habitability. It determines the presence of liquid water, essential for life as we know it.\n\nA stable temperature range supports diverse ecosystems and prevents extreme fluctuations that can disrupt life. This concept is central to the search for habitable exoplanets, as astronomers seek regions with the right temperature conditions around distant stars.",
      slider: 17.18,
      max: 25,
      min: 9,
      metric_unit: '°C',
      mark: {
        label: 'Earth · 17.18 °C',
        value: 17.18,
      },
    },
    {
      name: 'Nature',
      icon: '/icons/nature.png',
      description:
        "Nature plays a pivotal role in determining a planet's habitability. It influences climate, weather patterns, and geological features, impacting temperature, landforms, and available resources. Biodiversity and ecosystems provide essential services like pollination and water purification, sustaining life.\n\nFurthermore, natural resources such as clean air, freshwater, and fertile soil are vital for both human and ecological well-being. Understanding and preserving the delicate balance of nature is critical for maintaining a habitable environment.",
      slider: 50,
      max: 100,
      min: 0,
      metric_unit: '%',
      mark: {
        label: 'Earth · 50%',
        value: 50,
      },
    },
    {
      name: 'Surface',
      icon: '/icons/surface.png',
      description:
        'The terrain surface is a pivotal factor in habitability, influencing climate, water availability, and natural hazards. Landforms shape temperature variations, affecting regional climates. Water bodies and aquifers are determined by terrain, impacting the availability of freshwater, essential for life.\n\nCertain terrains can be prone to natural hazards like earthquakes or landslides, which can compromise safety and habitability. Additionally, the quality of soil, often influenced by terrain, directly affects agriculture and food production.',
      slider: 50,
      max: 100,
      min: 0,
      metric_unit: '%',
      mark: {
        label: 'Earth · 50%',
        value: 50,
      },
    },
    {
      name: 'Attributes',
      icon: '/icons/attributes.png',
      description: '',
      slider: 0,
      max: 0,
      min: 0,
      metric_unit: '',
      mark: {
        label: '',
        value: 0,
      },
    },
  ]

  const [options, setOptions] = useState<Option[]>(optionsData)

  async function getPlanetImages() {
    const water = options[0].slider / 10
    const nature = options[2].slider
    const surface = options[3].slider
    const temperature = options[1].slider

    const randomTexture = texturesList[Math.floor(Math.random() * 25)]

    setTexture(randomTexture)

    const color = randomTexture.split('.')[0].replace('-', ' ')

    let success = false

    await apiImages
      .post(
        '/send_message',
        {
          agua: water,
          natureza: nature,
          superficie: surface,
          temperatura: temperature,
          cor: color,
        },
        {
          timeout: 30000,
        },
      )
      .then((response) => {
        const tempImages = []

        if (response.data.link1) tempImages.push(response.data.link1)
        if (response.data.link2) tempImages.push(response.data.link2)
        if (response.data.link3) tempImages.push(response.data.link3)
        if (response.data.link4) tempImages.push(response.data.link4)

        setImages(tempImages)

        success = true
      })
      .catch((err) => {
        console.log(err)
      })

    return success
  }

  async function sendPlanetData() {
    const water = options[0].slider / 10
    const radius = attributes[0].slider / 10
    const mass = attributes[1].slider / 10
    const density = attributes[2].slider / 10
    const nature = options[2].slider
    const surface = options[3].slider
    const orbitalPeriod = attributes[3].slider
    const temperature = options[1].slider

    let success = false

    await apiPlanet
      .post('/planet', {
        id: uuidv4(),
        nome: planetName,
        agua: water,
        raio: radius,
        massa: mass,
        densidade: density,
        natureza: nature,
        superficie: surface,
        periodoOrbita: orbitalPeriod,
        temperatura: temperature,
      })
      .then((response) => {
        setPlanetInfo([
          {
            label: 'Water',
            value: response.data.agua,
          },
          {
            label: 'Temperature',
            value: response.data.temperatura,
          },
          {
            label: 'Nature',
            value: nature + '%',
          },
          {
            label: 'Surface',
            value: surface + '%',
          },
        ])

        setPlanetInfoAttr([
          {
            label: 'Radius',
            value: response.data.raio,
          },
          {
            label: 'Mass',
            value: response.data.massa,
          },
          {
            label: 'Density',
            value: response.data.densidade,
          },
          {
            label: 'Orbital Period',
            value: response.data.periodoOrbita,
          },
        ])

        setPlanetDescription(response.data.gpt.content)

        success = true
      })
      .catch((err) => {
        console.log(err)
      })

    return success
  }

  function getCurrentOption(): Option {
    const findedOption = options.find(
      (option) => option.name === currentSelection,
    )

    if (!findedOption) {
      return options[0]
    }

    return findedOption
  }

  async function handleNextStep() {
    setIsLoading(true)

    setLoadingLabel('Generating planet images')

    const resultImages = await getPlanetImages()

    if (!resultImages) {
      toast.info('We were unable to generate images of the planet')
    }

    setLoadingLabel('Generating planet description')

    const resultDescription = await sendPlanetData()

    if (!resultDescription) {
      toast.error('Error generating planet description, please try again.')

      setIsLoading(false)
      return
    }

    setIsLoading(false)

    const planet = document.getElementById('field-planet-main-planet')
    const logo = document.getElementById('logo-to-animate')
    const title = document.getElementById('title-to-animate')
    const options = document.getElementById('options-to-animate')
    const properties = document.getElementById('properties-to-animate')
    const button = document.getElementById('button-to-animate')

    if (!planet) return
    if (!logo) return
    if (!title) return
    if (!options) return
    if (!properties) return
    if (!button) return

    planet.classList.add(styles.planetAnimated)
    logo.classList.add(styles.logoAnimated)
    title.classList.add(styles.titleAnimated)
    options.classList.add(styles.optionsAnimated)
    properties.classList.add(styles.propertiesAnimated)
    button.classList.add(styles.buttonAnimated)

    setTimeout(() => {
      navigate('/report')
    }, 1200)
  }

  useEffect(() => {
    const input = document.getElementById('input-name-planet')

    if (!input) return

    if (isNaming) {
      input.focus()
    }
  }, [isNaming])

  return (
    <>
      {isLoading && <Loading label={loadingLabel} />}

      <div className={styles.container} id="field-container">
        <div className={styles.header} id="logo-to-animate">
          <img src="/logo.png" alt="Planet Factory" />
        </div>

        <div className={styles.content}>
          {!isNaming ? (
            <div
              className={styles.fieldTitle}
              onClick={() => {
                if (planetName === 'Name of the planet') {
                  setPlanetName('')
                }

                setIsNaming(true)
              }}
            >
              <h1 className={styles.contentTitle} id="title-to-animate">
                {planetName}
              </h1>
            </div>
          ) : (
            <input
              className={styles.inputNamePlanet}
              id="input-name-planet"
              type="text"
              value={planetName}
              onChange={(e) => setPlanetName(e.target.value)}
              onBlur={() => {
                if (planetName === '') {
                  setPlanetName('Name of the planet')
                }

                setIsNaming(false)
              }}
            />
          )}

          <div className={styles.mainContent}>
            <div className={styles.chooseContainer}>
              <div
                className={styles.chooseOptionsContainer}
                id="options-to-animate"
              >
                <div className={styles.options}>
                  {options.map((option) => (
                    <button
                      key={option.name}
                      className={
                        currentSelection === option.name ? styles.active : ''
                      }
                      onClick={() => setCurrentSelection(option.name)}
                    >
                      <img src={option.icon} alt={option.name} />
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={styles.optionProperties}
                id="properties-to-animate"
              >
                {getCurrentOption().name === 'Attributes' ? (
                  <div className={styles.fieldAttributes}>
                    {attributes.map((attributeItem) => (
                      <div
                        key={attributeItem.name}
                        className={styles.attribute}
                      >
                        <p>
                          {attributeItem.name}{' '}
                          <span className={styles.metric}>
                            ({attributeItem.metric_unit})
                          </span>
                        </p>

                        <div className={styles.sliderAttributeField}>
                          <span className={styles.sliderMaxMin}>
                            {attributeItem.showMaxMin(attributeItem.min)}
                          </span>
                          <Slider
                            value={attributeItem.slider}
                            max={attributeItem.max}
                            min={attributeItem.min}
                            marks={[attributeItem.mark]}
                            onChange={(e) => {
                              const newAttributes = attributes.map(
                                (attribute) => {
                                  if (attribute.name === attributeItem.name) {
                                    const target = e.target as HTMLInputElement

                                    const value = parseFloat(target.value)

                                    if (value <= attribute.min) {
                                      return {
                                        ...attribute,
                                        slider: attribute.min,
                                      }
                                    }

                                    if (value >= attribute.max) {
                                      return {
                                        ...attribute,
                                        slider: attribute.max,
                                      }
                                    }

                                    return {
                                      ...attribute,
                                      slider: value,
                                    }
                                  }

                                  return attribute
                                },
                              )

                              setAttributes(newAttributes)
                            }}
                          />
                          <span className={styles.sliderMaxMin}>
                            {attributeItem.showMaxMin(attributeItem.max)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className={styles.optionPropertiesHeader}>
                      <img
                        src={getCurrentOption().icon}
                        alt={getCurrentOption().name}
                      />
                      <h2>{getCurrentOption().name}</h2>
                    </div>

                    <p>{getCurrentOption().description}</p>

                    <div className={styles.sliderField}>
                      <span className={styles.sliderMaxMin}>
                        {getCurrentOption().min}
                        {getCurrentOption().metric_unit}
                      </span>
                      <Slider
                        value={getCurrentOption().slider}
                        max={getCurrentOption().max}
                        min={getCurrentOption().min}
                        marks={[getCurrentOption().mark]}
                        onChange={(e) => {
                          const newOptions = options.map((option) => {
                            if (option.name === currentSelection) {
                              const target = e.target as HTMLInputElement

                              const value = parseFloat(target.value)

                              if (value <= option.min) {
                                return {
                                  ...option,
                                  slider: option.min,
                                }
                              }

                              if (value >= option.max) {
                                return {
                                  ...option,
                                  slider: option.max,
                                }
                              }

                              return {
                                ...option,
                                slider: value,
                              }
                            }

                            return option
                          })

                          setOptions(newOptions)
                        }}
                      />
                      <span className={styles.sliderMaxMin}>
                        {getCurrentOption().max}
                        {getCurrentOption().metric_unit}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.planetField}>
              <Planet size={360} texture="/earth_hd.jpg" name="main-planet" />

              <button onClick={handleNextStep} id="button-to-animate">
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
