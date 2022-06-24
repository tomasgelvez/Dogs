import {React,useEffect} from 'react'
import {connect} from 'react-redux'
import {getDogs} from '../../store/actions/dogsAction.js'

function DogCards({dogs,getDogs}) {
    function getCharactersFunction(){
        getDogs()
    }
    useEffect(() => {
        getCharactersFunction()
    },[])
    console.log(dogs)
  return (
    <div>{dogs.map((dog) => {
        return <div>
            <p>{dog.name}</p>
            <img src={dog.image} alt={dog.name}/>
        </div>
    })} </div>
  )
}




const mapStateToProps = state => {
    return{
        dogs: state.dogs
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getDogs:dog => {
            dispatch(getDogs(dog))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DogCards)