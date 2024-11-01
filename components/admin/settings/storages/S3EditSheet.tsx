'use client'

import { Config } from '~/types'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '~/components/ui/sheet'
import { useButtonStore } from '~/app/providers/button-store-Providers'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'
import { Input } from '~/components/ui/input'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'

export default function S3EditSheet() {
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const { s3Edit, setS3Edit, setS3EditData, s3Data } = useButtonStore(
    (state) => state,
  )

  async function submit() {
    setLoading(true)
    try {
      await fetch('/api/v1/settings/update-s3-info', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(s3Data),
      }).then(res => res.json())
      toast.success('更新成功！')
      mutate('/api/v1/settings/s3-info')
      setS3Edit(false)
      setS3EditData([] as Config[])
    } catch (e) {
      toast.error('更新失败！')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet
      defaultOpen={false}
      open={s3Edit}
      onOpenChange={(open: boolean) => {
        if (!open) {
          setS3Edit(false)
          setS3EditData([] as Config[])
        }
      }}
      modal={false}
    >
      <SheetContent side="left" className="overflow-y-auto scrollbar-hide" onInteractOutside={(event: any) => event.preventDefault()}>
        <SheetHeader>
          <SheetTitle>编辑 S3</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-2">
          {
            s3Data?.map((config: Config) => (
              <div className="grid w-full max-w-sm items-center gap-1.5" key={config.id}>
                <Label htmlFor="text">{config.config_key}</Label>
                <Input
                  className="w-full sm:w-64"
                  value={config.config_value || ''}
                  placeholder={`输入${config.config_key}`}
                  onChange={(e) => setS3EditData(
                    s3Data?.map((c: Config) => {
                      if (c.config_key === config.config_key) {
                        c.config_value = e.target.value
                      }
                      return c
                    })
                  )}
                />
              </div>
            ))
          }
        </div>
        <Button className="cursor-pointer my-2" onClick={() => submit()} disabled={loading}>
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
          提交
        </Button>
      </SheetContent>
    </Sheet>
  )
}