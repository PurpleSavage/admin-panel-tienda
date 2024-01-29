import style from '../modules/spinnerAnimate.module.css'

const Spinner = () => {
  return (
    <div className='fixed right-0 bottom-0 left-0 top-0 
    bg-slate-100 bg-opacity-50 flex items-center justify-center z-50'
    >
        <div className={style.spinner}>
            <div className={style.cube1}></div>
            <div className={style.cube2 }></div>
        </div>
    </div>
  )
}

export default Spinner