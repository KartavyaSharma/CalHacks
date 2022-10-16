// Text field component

import React from 'react';
import '../Assets/Styles/generic.css';
import FuzzySearch from 'react-fuzzy';

function TextField(props) {

    const { placeholder, type, name, autocomplete, data } = props;

    function getFuzzySearch() {
        if (autocomplete) {
            const data = require('../Data/titles.json');
            let newData = []
            for (let i = 0; i < data['titles'].length; i++) {
                newData.push({ title: data['titles'][i] })
            }

            return (
                <FuzzySearch
                    list={newData}
                    keys={['title']}
                    width={430}
                    inputStyle={{ backgroundColor: '#F4F4F4', borderRadius: '5px', border: 'none', height: '16px', width: 'calc(100% - 104px)', paddingTop: '26px', marginLeft: '0px' }}
                    maxResults={5}
                    inputWrapperStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F4F4F4', borderRadius: '5px', border: '1px solid #e0e0e0', height: '50px', width: 'calc(100% - 104px)', padding: '0px', marginLeft: '32px', boxShadow: 'none' }}
                    onSelect={(newSelectedItem) => {
                        // Local state setter defined elsewhere
                        // setSelectedItem(newSelectedItem)
                    }}
                    resultsTemplate={(props, state, styles, clickHandler) => {
                        return state.results.map((val, i) => {
                            const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                            return (
                                <div key={i} style={style} onClick={() => clickHandler(i)}>
                                    {val.title}
                                </div>
                            );
                        });
                    }}
                />

            )
        }
    }


    return (
        // Input text field with the placeholder text and type (optional)
        <>
            {getFuzzySearch()}
            {!autocomplete ? <input type={type} placeholder={placeholder} name={name} autoComplete="new-password" /> : null}
        </>
    );
}

export default TextField;