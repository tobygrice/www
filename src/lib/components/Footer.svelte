<section class="footer" aria-label="Site footer">
	<div class="content-shell footer-content">
		<p>
			Built with Sveltekit and Tailwind CSS, deployed with Vercel.<br />

			Design inspired by
			<a href="https://batuhan.tech" target="_blank" rel="external noopener noreferrer">
				batuhan.tech
			</a>.<br />

			All source code on
			<a href="https://github.com/tobygrice/www" target="_blank" rel="external noopener noreferrer">
				GitHub
			</a>.
		</p>
	</div>
</section>

<style>
	.footer {
		--footer-size: 0.8075rem;
		padding-block: clamp(2.75rem, 8vh, 4.5rem) clamp(1.75rem, 5vh, 3rem);
	}

	.footer-content {
		display: flex;
		justify-content: center;
	}

	p {
		margin: 0;
		max-inline-size: 42rem;
		font-size: var(--footer-size);
		line-height: 1.55;
		text-align: center;
		color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.52);
	}

	a {
		color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.8);
		transition: color 200ms ease;
	}

	a:hover {
		color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink));
	}

	a:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 3px;
		border-radius: 0.2rem;
		color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink));
	}
</style>
