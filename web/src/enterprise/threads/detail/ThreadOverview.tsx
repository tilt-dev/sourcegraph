import React from 'react'
import { ThreadAreaContext } from './ThreadArea'

interface Props extends Pick<ThreadAreaContext, 'thread'> {
    className?: string
}

/**
 * The overview for a single thread.
 */
export const ThreadOverview: React.FunctionComponent<Props> = ({ thread, className = '' }) => (
    <div className={`thread-overview ${className || ''}`}>
        <h2>{thread.name}</h2>
        {thread.description && <p>{thread.description}</p>}
    </div>
)