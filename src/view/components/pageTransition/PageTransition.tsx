import { FC, ReactNode, useRef, useEffect } from 'react';
import styles from './pageTransition.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { pageOut } from '../../../main';

interface PageTransitionProps {
    pageIn: ReactNode;
    // pageOut: ReactNode;
}



let firstTime = true;

const PageTransition: FC<PageTransitionProps> = ({ pageIn }) => {
    const {statementId} = useParams();
    const componentRef = useRef(null);
    const navigate = useNavigate();
    // const location = useLocation();


    useEffect(() => {
        if (firstTime) {
            console.log("transition")
            const page: any = componentRef.current;

            page.onanimationend = () => {
                console.log('animationend');
                pageOut.pageOut = pageIn;
                console.log("saving pageOut")
                navigate(`/home/statement/${statementId}`)
            };
            firstTime = false;
        } else{
            console.log("not the first time");
        }
       
    }, []);

    useEffect(() => {
        firstTime = true;
    },[statementId]);



    return (
        <div className={styles.pageTransion} ref={componentRef}>
            <div className={styles.pageIn}>
                {pageIn}
            </div>
            <div className={styles.pageOut}>
                {pageOut.pageOut}
            </div>
        </div>
    );
};

export default PageTransition;


