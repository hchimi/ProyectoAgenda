var Contact = function(raw){
	this.id = _.uniqueId();

	if(raw!= undefined && raw!=null)
	{
		this.firstName = raw.firstName;
		this.lastName = raw.lastName;
		this.email = raw.email;
		this.country = raw.country;
	}
}
