import AccessibleIcon from '@mui/icons-material/Accessible';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { fontSizeSelector, increaseFontSize } from '../../../model/accessibility/accessibiliySlice';
import { useEffect, useState } from 'react';

const Accessiblity = () => {
    const dispatch = useAppDispatch();
    const fontSize = useAppSelector(fontSizeSelector);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.documentElement.style.fontSize = fontSize + 'px';
        document.body.style.fontSize = fontSize + 'px';
    }, [fontSize])

    function handleChangeFontSize(number: number) {
        dispatch(increaseFontSize(number))

    }

    function handleOpen() {
        if (isOpen) {
            // If it's not open, open it and start the timer to close it after 2 seconds
            setIsOpen(false);
    
            
        } else {
            // If it's already open, close it immediately
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
                console.log("close")
            }, 14000); // 7000 milliseconds (2 seconds)
        }
    }



    return (
        <div className="accessibility" style={!isOpen ? { left: "-12.6rem" } : { left: "0rem" }}>
            <div className='accessibility__button' onClick={handleOpen}>
                <AccessibleIcon htmlColor='white' />
            </div>
            <div className="accessibility__fonts">

                <div className="accessibility__fonts__control" onClick={() => handleChangeFontSize(1)}>+</div>
                <div className="accessibility__fonts__size">{fontSize}px</div>
                <div className="accessibility__fonts__control" onClick={() => handleChangeFontSize(-1)}>-</div>
                <span dir="ltr">Fonts:</span>
            </div>

        </div>
    )
}

export default Accessiblity