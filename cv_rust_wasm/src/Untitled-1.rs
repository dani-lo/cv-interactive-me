// { showOptions ?
                //     <div className="pending-actions-user-info">
                //         <p>This app tracks users by assigning a <strong>random identifier</strong>, stored in session. If you would like to persist your actions (i.e filters, bookmrks, annotations) you can do so: after
                //             persisting, your browser in future will automatically show your saved actions.
                //             <br />
                //             You can also use the thus stored random identifier to access your actions from a different broswer, i.e <strong>sharing</strong> your filters etc with colleagues
                //         </p>
                //         <p><strong>NOTE</strong> no personal data is required to persist actions: the app will simply save the random assigned token remotely and use that to recognise you in future sessions</p>
                //         <p>
                //             Your randomly assigned identifier is <strong>{ user.name }</strong>
                //         </p>
                //         <div className="pending-actions-user-opts">
                //             <p><strong>Do not show this again</strong></p>
                //             <StyledInputContainer className="pending-actions-user-opt">
                //                 <input type="checkbox" name="banPersistAlways" onChange={ (e) => setBanPersistAlways(e.target.checked) }/>
                //                 <label>Ever</label>
                //             </StyledInputContainer>
                //             <StyledInputContainer disabled={ !!banPersistAlways } className="pending-actions-user-opt">
                //                 <input type="checkbox" name="banPersistTemp" onChange={ (e) => setBanPersistTemp(e.target.checked) } />
                //                 <label>For the duration of this session</label>
                //             </StyledInputContainer>
                //             <StyledInputContainer disabled={ !banPersistAlways && !banPersistTemp }>
                //                 <button onClick={ () => {
                //                     if (banPersistAlways) {
    
                //                         user.banTracking()
                //                         uiOperationSuccess(void 0)
                //                     } else if (banPersistTemp) {
    
                //                         setBanUserTrackingSession(true)
                //                         uiOperationSuccess(void 0)
                //                     }
                //                 } }>Ok</button>
                //             </StyledInputContainer>
                //         </div>
                //     </div> : null
                // }