import Buttons from "../components/buttons.jsx";

function Les1 () {
    return(
        <>
            <div className={'ml-5 mr-5'}>
                <h1 className={'m-1 text-2xl font-bold '}>Les 1</h1>
                <h2 className={'font-bold text-xl py-4'}> leer de gebaren </h2>
                <div className={'flex w-full pb-5 '}>
                    <Buttons text="Bekijk gebaren" to="/woordenoverzicht"/>
                </div>

                <div className={'border-t border-black pt-5'}>
                    <h2 className={'font-bold text-xl pb-5'}>Oefen de gebaren</h2>
                    <div className={'flex justify-between mr-10 items-center'}>
                        <h3 className={'text-lg pb-3 font-bold'}>Opdracht 1</h3>
                        <Buttons text="30/30"/>
                    </div>
                    <div>
                        <p className={'text-lg py-4'}>oefen woorden</p>
                    </div>
                    <div className={'flex justify-center w-full pb-5'}>
                        <Buttons text="Oefen" to="/opdracht1"/>
                    </div>
                </div>

                <div className={'border-t border-black pt-5'}>
                    <div className={'flex justify-between mr-10 items-center'}>
                        <h3 className={'text-lg pb-3 font-bold'}>Opdracht 2</h3>
                        <Buttons text="30/30"/>
                    </div>
                    <div>
                        <p className={'text-lg py-4'}>oefen gebaren</p>
                    </div>
                    <div className={'flex justify-center w-full pb-5'}>
                        <Buttons text="Oefen" to="/opdracht2"/>
                    </div>
                </div>

                <div className={'border-t border-black pt-5'}>
                    <div className={'flex justify-between mr-10 items-center'}>
                        <h3 className={'text-lg pb-3 font-bold'}>Opdracht 3</h3>
                        <Buttons text="0/30"/>
                    </div>
                    <div>
                        <p className={'text-lg py-4'}>oefen zinnen</p>
                    </div>
                    <div className={'flex justify-center w-full pb-5'}>
                        <Buttons text="Oefen" to="/opdracht3"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Les1