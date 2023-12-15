import React, { useEffect, ReactNode, useState, useRef } from 'react';
import './toast.scss';
import CrossIcon from '../../icons/CrossIcon';

interface ProgressBarProps {
    durationInSeconds: number;
    directionProgressBar?: "bottom" | "top";
    isPaused?: boolean;
    onTogglePause?: () => void;
    onClose?: () => void;
    progressBarColor?: string;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
    durationInSeconds,
    isPaused,
    onTogglePause,
    onClose,
    progressBarColor
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
        progress >= 100 && onClose && onClose()
        return () => clearInterval(intervalId);
    }, [durationInSeconds, isPaused, progress]);

    const progressBarStyle: React.CSSProperties = {
        width: `${progress}%`,
        backgroundColor: progressBarColor
    }
    return (
        <div
            onMouseEnter={onTogglePause}
            onMouseLeave={onTogglePause}
            onTouchStart={onTogglePause}
            onTouchEnd={onTogglePause}
            onClick={onTogglePause}
            style={progressBarStyle} className='progress-bar'>
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
    directionProgressBar?: "top" | "bottom"
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
interface ProgressBarProp {
    [key: string]: { top?: string; bottom?: string };
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
    directionOFClose = '',
    directionOFStatus = "",
    progressBarColor = "",
    directionProgressBar = "bottom"
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
        leftTop: { left: "4%" },
        rightTop: { right: "4%" },
    };
    const iconStyleCross: React.CSSProperties = {
        ...iconPosition[directionOFClose],
    };
    const iconStyleStatus: React.CSSProperties = {
        ...iconPosition[directionOFStatus],
    };
    const renderIcon = (icon: React.ReactNode, style: React.CSSProperties) => (
        <div className="toast-icon" style={style}>
            {icon}
        </div>)

    const positionOfProgressBar: ProgressBarProp = {
        top: { top: "0%" },
        bottom: { bottom: "0%" },
    }
    const progressBarStyle: React.CSSProperties = {
        height: "10px",
        ...positionOfProgressBar[directionProgressBar]
    }
    return (
        <>
            {!isHidden && (
                <div
                    onMouseEnter={handlePause}
                    onMouseLeave={handleResume}
                    onTouchStart={handlePause}
                    onTouchEnd={handleResume}
                    onClick={handlePause}
                    ref={toastRef}
                    className={`toast-container ${className}`}
                    style={toastStyle}>

                    <div className='toast-header'>
                        {title && <div className="toast-title">{title}</div>}
                        {isClosable && renderIcon(<div onClick={() => onClose && onClose()}>{crossIcon || <CrossIcon />}</div>, iconStyleCross)}
                        {statusIcon && renderIcon(statusIcon, iconStyleStatus)}

                    </div>

                    {description && <div className="toast-description">{description}</div>}
                    {children && <div className='children-taost-description'>{children}</div>}
                    {durationInSeconds && (
                        <div className='progress-bar-container' style={progressBarStyle}>
                            <ProgressBar
                                durationInSeconds={durationInSeconds}
                                directionProgressBar={directionProgressBar}
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