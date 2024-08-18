import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'KS Tech - Магазин',
        short_name: 'KS Tech',
        description: "KS TECH пропонує металеві каркаси, модульні будинки, офіси, кав'ярні, приміщення для " +
            'охорони, буржуйки, котли, пічки, обладнання для сільського господарства, генератори ' +
            'та інші вироби з металу. Забезпечуємо швидке та надійне будівництво ' +
            'з використанням новітніх технологій.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}