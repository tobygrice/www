# Portfolio

Built with Svelte / SvelteKit. Deployed using Vercel. Design inspired by [batuhan.tech](https://batuhan.tech). 

This was my first project using an application framework. I found it to be a fairly steep learning curve, but much easier to develop in once I had wrapped my head around it.

I wanted to build this portfolio in a way that allowed page content to be easily modfied without having to touch any code. To achieve this, I stored all content in an external TypeScript file, then passed the relevant data to each component.

I also wanted my CV to be pulled from a live source and served as a static file. That way, I wouldn't have to replace the file in the repo every time I updated my CV. To do this, I moved my CV from Overleaf to its own GitHub repository. I created a GitHub workflow to compile my CV and publish it as a release every time a change is pushed. 

Once this was set up, I just added a /cv route that pulls [https://github.com/tobygrice/cv/releases/latest/download/Tobias_Grice_CV.pdf] and serves it a static file. Now, [www.tobygrice.com/cv] always points to my latest CV.

This was a challenging project, but I enjoyed building it - I am happy with the end result.
