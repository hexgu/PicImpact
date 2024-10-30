'use client'

import { Tabs } from '~/components/aceternity/tabs'
import AListTabs from '~/components/admin/settings/storages/AListTabs'
import S3Tabs from '~/components/admin/settings/storages/S3Tabs'
import S3EditSheet from '~/components/admin/settings/storages/S3EditSheet'
import AListEditSheet from '~/components/admin/settings/storages/AListEditSheet'
import R2EditSheet from '~/components/admin/settings/storages/R2EditSheet'
import R2Tabs from '~/components/admin/settings/storages/R2Tabs'

export default function Storages() {
  const tabs = [
    {
      title: "S3 API",
      value: "s3",
      content: (
        <S3Tabs />
      ),
    },
    {
      title: "Cloudflare R2",
      value: "r2",
      content: (
        <R2Tabs />
      ),
    },
    {
      title: "AList API",
      value: "alist",
      content: (
        <AListTabs />
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-2 h-full flex-1">
      <Tabs tabs={tabs} />
      <S3EditSheet />
      <R2EditSheet />
      <AListEditSheet />
    </div>
  )
}