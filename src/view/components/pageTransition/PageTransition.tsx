import { FC, ReactNode, useRef , useEffect } from 'react';
import styles from './pageTransition.module.scss';
import { useNavigate } from 'react-router-dom';

interface PageTransitionProps {
    pageIn: ReactNode;
    pageOut: ReactNode;
}

const PageTransition: FC<PageTransitionProps> = ({ pageIn, pageOut }) => {
    const componentRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const page:any = componentRef.current;

        page.onanimationend =  () => {
            console.log('animationend');
            navigate('/home/statement/8700677c-0b5a-4e07-9a41-6a254b48255d/vote')
        };
    }, []);

    return (
        <div className={styles.pageTransion} ref={componentRef}>
            <div className={styles.pageIn}>
                {pageIn}
            </div>
            <div className={styles.pageOut}>
                {pageOut}
            </div>
        </div>
    );
};

export default PageTransition;
