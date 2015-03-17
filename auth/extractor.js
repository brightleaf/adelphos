export default  (profile, callback) => {
    let { id, displayName, name, emails, photos, gender } = profile;

    callback(null, { 
        id, 
        displayName, 
        name, 
        emails, 
        photos, 
        gender,
        auth: 'google'
    });

}