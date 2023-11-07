import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TodoList } from './Home'

export const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoList />} />
            </Routes>
        </BrowserRouter>
    )
}
