type CallPageHeaderProps = {
	introLead: string;
	introSupportingText: string;
	submissionLabel: string;
	submissionEmail: string;
	submissionNote: string;
};

export const CallPageHeader = ({
	introLead,
	introSupportingText,
	submissionLabel,
	submissionEmail,
	submissionNote,
}: CallPageHeaderProps) => {
	return (
		<header className='pb-8 md:pb-14'>
			<h1
				id='call-editorial-guidelines-heading'
				className='max-w-6xl wrap-break-word text-[clamp(2.75rem,12vw,8rem)] font-semibold uppercase leading-[0.82] tracking-[-0.055em] md:leading-[0.8] md:tracking-[-0.06em]'
			>
				Call e norme editoriali
			</h1>

			<div className='mt-8 grid gap-8 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:gap-16'>
				<div className='max-w-3xl'>
					<p className='text-xl leading-[1.2] tracking-tight sm:text-2xl md:text-3xl'>
						{introLead}
					</p>

					<p className='mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg md:mt-6'>
						{introSupportingText}
					</p>
				</div>

				<div className='min-w-0 border-t border-white/15 pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6'>
					<p className='font-mono text-xs uppercase tracking-[0.12em] text-white/60'>
						{submissionLabel}
					</p>

					<a
						href={`mailto:${submissionEmail}`}
						className='mt-4 inline-block max-w-full break-all text-lg tracking-[-0.02em] transition-colors hover:text-purple-300 active:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-xl md:text-2xl'
					>
						{submissionEmail}
					</a>

					<p className='mt-4 max-w-md text-sm leading-relaxed text-white/55 md:mt-5'>
						{submissionNote}
					</p>
				</div>
			</div>
		</header>
	);
};
