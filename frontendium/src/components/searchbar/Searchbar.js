import {useState} from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import './Searchbar.css';

function SearchBar() {
    const [query, setQuery] = useState('')

    const updateQuery = (e) => {
        setQuery(e.target.value)
    }

    const search = () => {
        console.log('search query: ', query)
        //send query to backend or whatever tf here
    }

    return(
        <div class="search-bar">
            <h4>Insert Industry Here</h4>
            <InputGroup>
                <FormControl
                    placeholder="Choose an Industry"
                    aria-label="Choose an Industry"
                    onChange={updateQuery}
                />
                <InputGroup.Append>
                    <Button variant='primary' onClick={search}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}

export default SearchBar;