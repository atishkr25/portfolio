'use client'

import Script from 'next/script'
import { catconfig } from '@/config/Catconfig'

const Oneko = () => {
    if (!catconfig.enabled) return null

    return (
        <>
            {/* MUST run before oneko.js */}
            <Script id="oneko-force" strategy="beforeInteractive">
                {`window.ONEKO_FORCE = true;`}
            </Script>

            <Script
                src="/oneko/oneko.js"
                data-cat="/oneko/oneko.gif"
                strategy="afterInteractive"
            />
        </>
    )
}

export default Oneko
