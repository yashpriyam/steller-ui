
import React, { useEffect, ReactNode, useState, useRef } from 'react';
import './toast.scss';
import CrossIcon from '../../icons/CrossIcon';
import SuccessIcon from '../../icons/SuccessIcon';

interface ProgressBarProps {
    durationInSeconds: number;
    progressBarColor?: string;
    postionOfProgressBar?: "bottom" | "top";
    isPaused?: boolean;
    onTogglePause?: () => void;
    onClose?: () => void;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
    durationInSeconds,
    progressBarColor,
    isPaused,
    onTogglePause,
    onClose,
    postionOfProgressBar = "top",
}) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        const updateProgress = () => {
            if (!isPaused && progress < 100) {
                setProgress((prevProgress) => prevProgress + (100 / (durationInSeconds * 10)));
            }
        };
        intervalId = setInterval(updateProgress, 100);

        progress === 100 && onClose && onClose()

        return () => clearInterval(intervalId);
    }, [durationInSeconds, isPaused, progress]);

    const progressBarPositionStyle: React.CSSProperties = {
        bottom: postionOfProgressBar === "bottom" ? "-14px" : "50px",
        left: "-40px"
    }
    const progressBarStyle: React.CSSProperties = {
        width: `${progress}%`,
        height: '100%',
        position: "absolute",
        backgroundColor: `${progressBarColor}`,
    }

    return (
        <div
            onMouseEnter={onTogglePause}
            onMouseLeave={onTogglePause}
            onTouchStart={onTogglePause}
            onTouchEnd={onTogglePause}
            onClick={onTogglePause}
            style={progressBarPositionStyle} className='progress-bar-container'>
            <div className='progress-bar' style={progressBarStyle}></div>
        </div>
    );
};

interface ToastProps {
    title?: ReactNode;
    description?: ReactNode;
    isClosable?: boolean;
    durationInSeconds?: number;
    direction?: ToastDirection;
    offset?: Offset;
    bgColor?: string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClose?: () => void;
    isHidden?: boolean;
    crossIcon?: React.ReactNode;
    statusIcon?: React.ReactNode;
    directionOFClose?: "leftTop" | "rightTop";
    directionOFStatus?: "leftTop" | "rightTop";
    progressBarColor?: string;
    postionOfProgressBar?: "top" | "bottom"
}

interface Offset {
    left?: number;
    top?: number;
}

type ToastDirection = 'leftCenter' | 'leftTop' | 'leftBottom' | 'rightCenter' | 'rightTop' | 'rightBottom' | 'top' | 'bottom' | 'center' | 'inPlace';

interface ToastPosition {
    left?: number;
    top?: number;
    transform?: string;
}
interface IconProp {
    [key: string]: { left?: string; right?: string };
}

export const Toast: React.FC<ToastProps> = ({
    title,
    description,
    isClosable,
    durationInSeconds = 3,
    direction = 'inPlace',
    offset = { left: 0, top: 0 },
    bgColor,
    color,
    className,
    style,
    children,
    onClose,
    isHidden,
    crossIcon,
    statusIcon,
    directionOFClose = 'rightTop',
    directionOFStatus = "leftTop",
    progressBarColor = "red",
    postionOfProgressBar = "bottom"
}) => {
    const toastRef = useRef<HTMLDivElement>(null);
    const [isTimerRunning, setTimerRunning] = useState(true);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toastRef.current && !toastRef.current.contains(event.target as Node)) {
                onClose && onClose();
            }
        };
        const handleToastClick = () => setTimerRunning((prev) => !prev);
        const handleMouseEnter = () => setIsMouseOver(true);
        const handleMouseLeave = () => setIsMouseOver(false)
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('click', handleToastClick);
        toastRef.current?.addEventListener('mouseenter', handleMouseEnter);
        toastRef.current?.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('click', handleToastClick);
            toastRef.current?.removeEventListener('mouseenter', handleMouseEnter);
            toastRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [durationInSeconds, onClose, isMouseOver, isTimerRunning,]);

    const handlePause = () => setIsPaused(true);
    const handleResume = () => setIsPaused(false);
    const createPosition = (left: number, top: number): ToastPosition => ({
        left,
        top,
        transform: `translate(-${left}%, -${top}%)`,
    });
    const toastPosition: Record<string, ToastPosition> = {
        leftCenter: createPosition(0, 50),
        leftTop: createPosition(0, 0),
        leftBottom: createPosition(0, 100),
        rightCenter: createPosition(100, 50),
        rightTop: createPosition(100, 0),
        rightBottom: createPosition(100, 100),
        top: createPosition(50, 0),
        bottom: createPosition(50, 100),
        center: createPosition(50, 50),
        inPlace: {},
    };
    const getPosition = (offset: Offset, direction?: ToastDirection) => {
        const currentPosition = toastPosition[direction || 'inPlace'];
        return {
            ...currentPosition,
            left: `${Number(currentPosition.left) + Number(offset.left)}% `,
            top: `${Number(currentPosition.top) + Number(offset.top)}% `,
        };
    };
    const toastStyle: React.CSSProperties = {
        backgroundColor: bgColor || '#ffffff',
        color: color || '#000000',
        paddingLeft: (directionOFClose === "leftTop") || (directionOFStatus === "leftTop") ? "40px" : "",
        ...style,
        ...getPosition(offset, direction),
    };
    const iconPosition: IconProp = {
        leftTop: { left: "5%" },
        rightTop: { right: "5%" },
    };
    const iconStyleCross: React.CSSProperties = {
        position: "absolute",
        top: "15%",
        ...iconPosition[directionOFClose],
    };
    const iconStyleStatus: React.CSSProperties = {
        position: "absolute",
        top: "15%",
        ...iconPosition[directionOFStatus],
    };
    const renderIcon = (icon: React.ReactNode, style: React.CSSProperties) => (
        <div className="toast-icon" style={style}>
            {icon}
        </div>)
    return (
        <>
            {!isHidden && (
                <div
                    onMouseEnter={handlePause}
                    onMouseLeave={handleResume}
                    onClick={handlePause}
                    ref={toastRef}
                    className={`toast-container ${className}`}
                    style={toastStyle}>

                    <div className='toast-header'>
                        {title && <div className="toast-title">{title}</div>}
                        {isClosable && renderIcon(<div onClick={() => onClose && onClose()}>{crossIcon || <CrossIcon />}</div>, iconStyleCross)}
                        {renderIcon(statusIcon || <SuccessIcon />, iconStyleStatus)}

                    </div>

                    {description && <div className="toast-description">{description}</div>}
                    {children && <div className='children-taost-description'>{children}</div>}
                    {durationInSeconds && (
                        <div style={{
                            position: 'relative',
                            width: `${(directionOFClose === "leftTop") || (directionOFStatus === "leftTop") ? '100%' : "90%"}`,
                            left: `${(directionOFClose === "leftTop") || (directionOFStatus === "leftTop") ? '' : "12%"}`
                        }}>
                            <ProgressBar
                                durationInSeconds={durationInSeconds}
                                postionOfProgressBar={postionOfProgressBar}
                                onClose={onClose}
                                isPaused={isPaused}
                                onTogglePause={handlePause}
                                progressBarColor={progressBarColor}
                            />
                        </div>
                    )}

                </div>
            )}
        </>
    );
};











