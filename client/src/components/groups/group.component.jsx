import React, { Component } from 'react';
import {createGroup, 
    getAllGroups, 
    joinGroup, 
    leaveGroup, 
    deleteGroup, 
    getGroupMembersById} from '../../redux/action/group.action';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ModalWindow from '../modal-window/modal-window.component';




class Group extends Component {
    state={
        name:'',
        category:'',
        showModal: false
    }

    componentDidMount(){
      this.props.getAllGroups()
    }

    getGroupMembersById = (groupId) =>{
      this.props.getGroupMembersById(groupId)
  
    }

    getDate = (e) =>{
        let date = new Date(e)     
        this.setState({date: date})
    }


    toggleModal = (showModal) =>{
      this.setState({showModal: showModal},
        ()=>this.props.getAllGroups())
    }


    onChangeHandle = (e) =>{
        this.setState({[e.target.name]:e.target.value })
    }


    onSubmitHandler = (e) =>{
      e.preventDefault()
      const group = this.state
      this.props.createGroup(group)
      this.setState({
        showModal:false,
        name:'',
        category:'',
      })
    }
    

  	render() {
		const {
		allGroups, 
		currentUser,
		joinGroup,
		leaveGroup } = this.props
    const {name, category} = this.state;
    
    return (
      <div className='event'>  
        <button className='add-button' onClick={()=> this.toggleModal(true) } >Add</button>
        { allGroups && 
        <div>
        <hr style={{marginTop:'20px'}}/>
          <p className='list-group-item-info'> Click vào tiêu đề để tham gia phòng chat</p>
          <ul className='event__list'>
            {allGroups.map((group, i)=>(
              <div key={i} className='card'>
                    {
                      group.members.includes(currentUser.username) ?
                        <Link  
                          to={`/group/${group._id}`} 
                          onClick={this.getGroupMembersById(group._id)}>
                            <h1 className='card__header'>{group.name}</h1>
                        </Link>:
						<h1 className='card__header'>{group.name}</h1>
                    }
					<div className="card__details">
						<div className="card__item">
							<span className="label">Category: </span>
							<span className="data"> {group.category} </span>
						</div>
						{group.members.includes(currentUser.username) ?
							<button className='form-submit-button' onClick={() => leaveGroup(group._id)}>
								Rời Khỏi
							</button> :
							<button className='form-submit-button' onClick={() => joinGroup(group._id)}>
								<span >Join</span>
							</button>
						}
					</div>
				</div>
			))}
        </ul>
        </div>
        }
        {this.state.showModal && 
            <ModalWindow closeHandler={this.toggleModal} >
              <form onSubmit={this.onSubmitHandler}>
                <label className='group__label' for='name'>Group Name</label>
                <input 
                  type='text' 
                  className='group__input' 
                  onChange={this.onChangeHandle} 
                  value={name} name='name' placeholder='Group name...'/>
                <label className='group__label' for='category'>Category</label>
                <input 
                  type='text' 
                  className='group__input' 
                  name='category' 
                  value={category}
                  onChange={this.onChangeHandle} />
                <input 
                  type='submit' 
                  className='form-submit-button'
                  placeholder='Group category...' 
                  value='Submit'/>
              </form>
          </ModalWindow>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>({
  createGroup: group => dispatch(createGroup(group)),
  joinGroup: group => dispatch(joinGroup(group)),
  leaveGroup: group => dispatch(leaveGroup(group)),
  getAllGroups: () => dispatch(getAllGroups()),
  deleteGroup: () => dispatch(deleteGroup()),
  getGroupMembersById: (groupId) => dispatch(getGroupMembersById(groupId))
})


const mapStateToProps = state =>({
  allGroups: state.groups.groups,
  currentUser:state.user.currentUser

})
export default connect(mapStateToProps, mapDispatchToProps)(Group)
