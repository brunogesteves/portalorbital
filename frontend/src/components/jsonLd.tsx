export default function JsonLD(description: { description: string }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "News",
        "name": "Orbital Channel",
        "url": "https://orbitaltv.net",
        "title": { description },
    }
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }
            }
        />
    )
}




