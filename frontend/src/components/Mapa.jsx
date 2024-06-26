import React, { useState } from 'react'
import { Map, Marker } from 'pigeon-maps'

export function Mapa({data}) {
    // Componente para mostrar mapa
  const [center, setCenter] = useState([Number(data.Latitud), Number(data.Longitud)])
  const [zoom, setZoom] = useState(11)
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  return (
    <Map 
      height={300}
      center={center} 
      zoom={zoom} 
      onBoundsChanged={({ zoom }) => { 
        setZoom(zoom) 
      }} 
    >
        <Marker 
        width={50}
        anchor={center} 
        color={color} 
        onClick={() => setHue(hue + 20)} 
      />
    </Map>
  )
}