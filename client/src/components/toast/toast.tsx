import React, { useEffect, useState } from 'react';
import './toast.scss';
import CrossIcon from '../../icons/CrossIcon';

interface ToastProps {
    title?: string;
    description?: string;
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
}
interface Offset {
    left?: number;
    top?: number;
}

type ToastDirection = | 'leftCenter' | 'leftTop' | 'leftBottom' | 'rightCenter' | 'rightTop' | 'rightBottom' | 'top' | 'bottom' | 'center' | 'inPlace';

interface ToastPosition {
    [key: string]: { left?: number; top?: number, transform?: string };
}

export const Toast: React.FC<ToastProps> = ({
    title,
    description,
    isClosable,
    durationInSeconds = 3,
    direction = 'inPlace',
    offset = { left: 0, top: 0, },
    bgColor,
    color,
    className,
    style,
    children,
    onClose,
    isHidden,
}) => {
    const toastPosition: ToastPosition = {
        leftCenter: { left: 0, top: 50, transform: "translate(-0%, -50%)" },
        leftTop: { left: 0, top: 0, transform: "translate(0%,0%)" },
        leftBottom: { left: 0, top: 100, transform: "translate(-0%, -100%)" },
        rightCenter: { left: 100, top: 50, transform: "translate(-100%, -50%)" },
        rightTop: { left: 100, top: 0, transform: "translate(-100%, -0%)" },
        rightBottom: { left: 100, top: 100, transform: "translate(-100%, -100%)" },
        top: { top: 0, left: 50, transform: "translate(-50%, 0%)" },
        bottom: { top: 100, left: 50, transform: "translate(-50%, -100%)" },
        center: { top: 50, left: 50, transform: "translate(-50%, -50%)" },
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

    const handleAutoToastClose = (durationInSeconds: number) => {
        if (durationInSeconds > 0) {
            setTimeout(() => {
                onClose && onClose()
            }, durationInSeconds * 1000);
        }
    }

    useEffect(() => {
        handleAutoToastClose(durationInSeconds);
    }, [durationInSeconds]);

    const handleClose = () => {
        onClose && onClose()
    };

    const toastStyle: React.CSSProperties = {
        backgroundColor: bgColor || '',
        color: color || '',
        ...style,
        ...getPosition(offset, direction)
    };

    return (<>{!isHidden && <div className={`toast-container ${className}`} style={toastStyle}>
        <div className='toast-header'>
            {title && <span className="toast-title">{title}</span>}
            {isClosable && (
                <button className="close-button" onClick={handleClose}>
                    <CrossIcon />
                </button>
            )}
        </div>
        {description && <div className="toast-description">{description}</div>}
        {children}
    </div>}
    </>
    )
}
