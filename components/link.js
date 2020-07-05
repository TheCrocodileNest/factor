import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE ?? ''

const BasedLink = ({ href, children, as = href }) => (
	<Link href={href} as={`${base}${as}`}>
		<a>{children}</a>
	</Link>
)

export default BasedLink
