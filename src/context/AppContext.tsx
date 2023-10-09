import { createContext, useState } from 'react'

interface Option {
  value: string
  label: string
}

interface AppContextInterface {
  planetName: string
  setPlanetName: (name: string) => void

  planetDescription: string
  setPlanetDescription: (description: string) => void

  images: string[]
  setImages: (images: string[]) => void

  texture: string
  setTexture: (texture: string) => void

  planetInfo: Option[]
  setPlanetInfo: (planetInfo: Option[]) => void

  planetInfoAttr: Option[]
  setPlanetInfoAttr: (planetInfo: Option[]) => void
}

interface AppProviderProps {
  children: React.ReactNode
}

export const AppContext = createContext({} as AppContextInterface)

export function AppProvider({ children }: AppProviderProps) {
  const [planetName, setPlanetName] = useState('Name of the planet')
  const [planetDescription, setPlanetDescription] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [texture, setTexture] = useState('')

  const [planetInfo, setPlanetInfo] = useState<Option[]>([])
  const [planetInfoAttr, setPlanetInfoAttr] = useState<Option[]>([])

  return (
    <AppContext.Provider
      value={{
        planetName,
        setPlanetName,
        planetDescription,
        setPlanetDescription,
        images,
        setImages,
        texture,
        setTexture,
        planetInfo,
        setPlanetInfo,
        planetInfoAttr,
        setPlanetInfoAttr,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
