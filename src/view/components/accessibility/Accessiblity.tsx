import AccessibleIcon from '@mui/icons-material/Accessible';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { fontSizeSelector, increaseFontSize } from '../../../model/accessibility/accessibiliySlice';
import { useEffect } from 'react';

const Accessiblity = () => {
    const dispatch = useAppDispatch();
    const fontSize = useAppSelector(fontSizeSelector)

function handleChangeFontSize(number:number) {
    dispatch(increaseFontSize(number))

}

useEffect(() => {
    document.documentElement.style.fontSize = fontSize + 'px';
    document.body.style.fontSize = fontSize + 'px';
}, [fontSize])

    return (
        <div className="accessibility">
            <div className='accessibility__button'>
                <AccessibleIcon htmlColor='white' />
            </div>
            <div className="accessibility__fonts">
                
                <div className="accessibility__fonts__control" onClick={()=>handleChangeFontSize(1)}>+</div>
                <div className="accessibility__fonts__size">{fontSize}px</div>
                <div className="accessibility__fonts__control" onClick={()=>handleChangeFontSize(-1)}>-</div>
                <span dir="ltr">Fonts:</span>
            </div>
            
        </div>
    )
}

export default Accessiblity