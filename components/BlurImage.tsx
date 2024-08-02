'use client'

import React from 'react'
import { useButtonStore } from '~/app/providers/button-store-Providers'
import { Image } from '@nextui-org/image'

export default function BlurImage({ photo, dataList }: { photo: any, dataList: any }) {
  const { setMasonryView, setMasonryViewData, setMasonryViewDataList } = useButtonStore(
    (state) => state,
  )

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      loading="lazy"
      shadow="sm"
      radius="none"
      onClick={() => {
        setMasonryView(true)
        setMasonryViewData(photo)
        setMasonryViewDataList(dataList)
      }}
      className="duration-700 ease-in-out group-hover:opacity-75 cursor-pointer transition-all will-change-transform hover:scale-[1.01]"
    />
  )
}