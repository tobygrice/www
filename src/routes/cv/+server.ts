export const GET = async ({ fetch }) => {
    const upstreamUrl =
        'https://github.com/tobygrice/cv/releases/latest/download/Tobias_Grice_CV.pdf';

    const upstream = await fetch(upstreamUrl, {
        redirect: 'follow'
    });

    if (!upstream.ok) {
        return new Response('Failed to fetch resume PDF', { status: 502 });
    }

    return new Response(upstream.body, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="Tobias_Grice_CV.pdf"',
            'Cache-Control': 'no-cache'
        }
    });
};
