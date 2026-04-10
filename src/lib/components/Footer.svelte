<section
	class="pt-[clamp(2.75rem,8vh,4.5rem)] pb-[clamp(1.75rem,5vh,3rem)]"
	aria-label="Site footer"
>
	<div class="content-shell footer-content">
		<p class="footer-copy">
			Built using
			<a
				class="footer-link"
				href="https://kit.svelte.dev"
				target="_blank"
				rel="external noopener noreferrer"
			>
				SvelteKit
			</a>
			and
			<a
				class="footer-link"
				href="https://tailwindcss.com/"
				target="_blank"
				rel="external noopener noreferrer"
			>
				Tailwind CSS
			</a>, deployed with
			<a
				class="footer-link"
				href="https://vercel.com"
				target="_blank"
				rel="external noopener noreferrer"
			>
				Vercel
			</a>. Coded in
			<a
				class="footer-link"
				href="https://zed.dev"
				target="_blank"
				rel="external noopener noreferrer"
			>
				Zed
			</a>
			by yours truly.<br />

			Design inspired by
			<a
				class="footer-link"
				href="https://batuhan.tech"
				target="_blank"
				rel="external noopener noreferrer"
			>
				batuhan.tech
			</a>.<br />

			Source code on
			<a
				class="footer-link"
				href="https://github.com/tobygrice/www"
				target="_blank"
				rel="external noopener noreferrer"
			>
				GitHub
			</a>.
		</p>
	</div>
</section>

<style>
	.footer-content {
		display: flex;
		justify-content: center;
	}

	.footer-copy {
		margin: 0;
		max-inline-size: 40rem;
		font-size: 0.8rem;
		line-height: 1.55;
		text-align: center;
		color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.5);
	}

	.footer-link {
		color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.75);
		text-decoration: none;
		transition: color 200ms ease;
	}

	.footer-link:hover {
		color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink));
	}

	.footer-link:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 3px;
		border-radius: 0.2rem;
		color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink));
	}
</style>
