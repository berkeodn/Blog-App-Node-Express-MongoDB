function slugify(text) {
    var str = text.toLowerCase().trim()  
    str = str.replace(/ğ/g, 'g')
    str = str.replace(/ü/g, 'u')
    str = str.replace(/ş/g, 's')
    str = str.replace(/ı/g, 'i')
    str = str.replace(/ö/g, 'o')
    str = str.replace(/ç/g, 'c')
    str = str.replace(/[^a-z0-9-]/g, '-')
    str = str.replace(/-+/g, '-')
    var random_string           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length; 
    for ( var i = 0; i < charactersLength; i++ ) {
      random_string += characters.charAt(Math.floor(Math.random() * charactersLength)); 
    }
    return str + '-' + random_string;
  }

  module.exports = slugify;