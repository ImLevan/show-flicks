import { TvAndMovieData } from "../utilities/types"

interface Props {
    audiovisual: TvAndMovieData
}

const AudiovisualProductions: React.FC<Props> = ({audiovisual}) => {
    return (
        <section className="px-5 md:px-8 lg:px-12 lg:py-12 bg-[#050505]">
            <div className="px-5 md:px-8 lg:px-12 2xl:px-16 text-gray-300 py-8 pt-8 lg:py-20">
                <article className="md:px-16 lg:px-0 h-full max-w-[1770px] mx-auto">
                    <div className="mx-auto max-w-[1200px] my-10 flex flex-row flex-wrap justify-between gap-10">
                        <div>
                            <h4 className="mb-2 font-semibold lg:text-3xl undefined">Production Companies</h4>
                            <ul className="text-xs lg:text-lg flex flex-col gap-1">
                                {audiovisual?.production_companies?.map((company) => (
                                    <li key={company.id} className="text-gray-400 flex">
                                        {company.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-semibold lg:text-3xl undefined">Production Countries</h4>
                            <ul className="text-xs lg:text-lg flex flex-col gap-1">
                                {audiovisual?.production_countries?.map((countries) => (
                                    <li key={countries.iso_3166_1} className="text-gray-400 flex">
                                        {countries.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default AudiovisualProductions