import { FC, ReactNode, useRef, useEffect } from 'react';
import styles from './pageTransition.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { pageOut } from '../../../main';

interface PageTransitionProps {
    pageIn: ReactNode;
    // pageOut: ReactNode;
}





const PageTransition: FC<PageTransitionProps> = ({ pageIn }) => {
    const {statementId} = useParams();
    const componentRef = useRef(null);
    const navigate = useNavigate();



    useEffect(() => {
       
            console.log("first time transition ....")
            const page: any = componentRef.current;

            page.onanimationend = () => {
                console.log('animationend');
                // pageOut.pageOut = pageIn;
                console.log("saving pageOut")
                navigate(`/home/statement/${statementId}`)
            };
          
       
       
    }, []);





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


