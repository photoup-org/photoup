"use client"

import { getData } from '@/actions/home';
import { LogoBlack, LogoWhite } from '@/components/Logos';
import { useLanguage } from '@/contexts/locale';
import { useDataFetch } from '@/hooks/useDataFetch';
import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
import LoadingPage from '../LoadingPage';
import Image from 'next/image';
import { useTheme } from 'next-themes';


const Footer = () => {
  const { maxWidth } = useWindowSize();
  const { language } = useLanguage()
  const { data, loading } = useDataFetch(getData, "Contacts")
  const { resolvedTheme } = useTheme()

  if (!data || data.length === 0) return null;

  const footerColor = resolvedTheme === "light" ? "bg-teal-200" : "bg-teal-800"
  const addressData = data[0]

  return (<LoadingPage id="footer" loading={loading}>

    <footer className={cn('w-full flex justify-center p-10 z-0 mt-52', footerColor)}>
      <div style={{ maxWidth }} className='w-full flex-col'>
        {resolvedTheme === "light" ? <LogoBlack width={140} /> : <LogoWhite width={140} />}
        <div className='mt-16 flex flex-col lg:flex-row max-lg:items-center lg:justify-between gap-y-7'>
          <FooterNavComponent
            sectionTitle={{
              title: "HOME",
              link: "/"
            }}
            navItems={[
              // {
              //   title: language === "EN" ? "The System": "Benefícios",
              //   link: "/?scrollTo=benefits"
              // },
              {
                title: language === "EN" ? "Our Mission" : "Missão",
                link: "/?scrollTo=mission&pos=1"
              },
              {
                title: language === "EN" ? "Our Vision" : "Visão",
                link: "/?scrollTo=benefits&pos=2"
              },
              {
                title: language === "EN" ? "Sustainability" : "Sustentabilidade",
                link: "/?scrollTo=sustainability&pos=3"
              },
              {
                title: language === "EN" ? "Acknowledgments" : "Reconhecimento",
                link: "/?scrollTo=awards&pos=4"
              }
            ]}
          />
          <FooterNavComponent
            sectionTitle={{
              title: language === "EN" ? "ABOUT US" : "SOBRE NÓS",
              link: "/sobre"
            }}
            navItems={[
              // {
              //   title: language === "EN" ? "Our History": "A Nossa História",
              //   link: "/sobre?scrollTo=history"
              // },
              {
                title: language === "EN" ? "Our Values" : "Os Nossos Valores",
                link: "/sobre?scrollTo=values"
              },
              {
                title: language === "EN" ? "Our Team" : "A Equipa",
                link: "/sobre?scrollTo=team"
              },
              // {
              //   title: language === "EN" ? "Our Partners": "Os Nossos Parceiros",
              //   link: "/sobre?scrollTo=partners"
              // },
            ]}
          />
          <FooterNavComponent
            sectionTitle={{
              title: language === "EN" ? "SERVICES" : "SERVIÇOS",
              link: "/servicos"
            }}
            navItems={[]}
          />
          <FooterNavComponent
            sectionTitle={{
              title: language === "EN" ? "CONTACTS" : "CONTACTOS",
              link: addressData.link!,
              newWindow: true,
            }}
            navItems={[
              {
                title: addressData.address!,
                link: addressData.link!,
                newWindow: true,
                className: "max-w-44 lg:text-start text-center"
              },
              {
                title: `${addressData.addressCode!} ${addressData.city!}`,
                link: addressData.link!,
                newWindow: true
              },
              {
                title: addressData.email!,
                link: `mailto:${addressData.email}`,
                newWindow: true
              }
            ]}
          />
        </div>
        <div className='flex max-lg:flex-col justify-between mt-16 items-center gap-3'>
          <span className='text-xs'>© Photoup {new Date().getFullYear()}, all rights reserved</span>
          <PartnersComponent />
          <div className='flex gap-1 items-center'>
            <Link className="text-xs" href="/terms">Termos e Condições</Link>
            |
            <Link className="text-xs" href="/privacy">Política de Privacidade</Link>
          </div>
        </div>
        <div className='mt-8 mb-4 flex justify-center w-full'>
          <Link href="/funding/voucher/cartaz.pdf" target="_blank" className="rounded-2xl p-2">
            <Image src={`/funding/voucher/${resolvedTheme === "dark" ? "funding_logos_w.png" : "funding_logos_b.png"}`} width={400} height={100} alt="Funding" className="object-contain max-h-20 w-auto" />
          </Link>
        </div>
      </div>
    </footer>

  </LoadingPage>
  )
}



const PartnersComponent = () => {
  const { resolvedTheme } = useTheme()
  const { data, loading } = useDataFetch(getData, "Partners")
  // const {language} = useLanguage()

  if (!data || data.length === 0) return null;


  return <LoadingPage id="partners" loading={loading}>
    <div className={cn('flex justify-center items-center gap-2 rounded-2xl p-2', resolvedTheme === "dark" ? "bg-white" : "")}>
      {data.map(partner => {
        return partner.visible && <Link href={partner.link as string} target="__blank" key={partner.id}>
          <Image title={partner.title as string} src={partner.icon![0].url} width={partner.size! as number} height={250} alt={partner.title} />
        </Link>
      })}
    </div>
  </LoadingPage>
}


type TNavItem = {
  title: string
  link: string,
  newWindow?: boolean,
  className?: string
}

type FooterNavComponentProps = {
  sectionTitle: TNavItem
  navItems: TNavItem[],

}

const FooterNavComponent = ({
  sectionTitle,
  navItems
}: FooterNavComponentProps) => {
  return <div className='flex flex-col gap-2 items-center lg:items-start'>
    <Link className='font-bold text-lg cursor-pointer' href={sectionTitle.link}>{sectionTitle.title}</Link>
    {navItems.map(ni => {
      return <Link target={ni.newWindow ? "_blank" : ""} className={
        cn('lg:pl-5 cursor-pointer', ni.className)
      } key={ni.title} href={ni.link}>{ni.title}</Link>
    })}
  </div>
}
export default Footer
