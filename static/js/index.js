$(document).ready(function(){

    console.log('El documento está listo.')

    //  Obteniendo la fecha usando el objeto Date() y convirtiéndolo a cadena de caracteres
    let date = new Date()
    let current_date = date.toDateString()

    //  Mostrando la fecha en la página HTML usando JQUERY y JS
    $('#date').text('Fecha: ' + current_date)

    
    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

    //  Haciendo una función para una petición AJAX
    function ajax_request(api_url , input_data){

        $.ajax({

            // Tipo de petición
            type : 'POST',

            // URL
            url : api_url,

            //  Datos JSON
            data : JSON.stringify(input_data),

            //  Tipo de dato de la respuesta esperada
            dataType : 'json',

            //  Tipo de contenido
            contentType : 'application/json',

            //  Método success
            success : function(result)
            {
                //  Extraer los sentimientos y la ruta de los emoticones
                emotion = result.sentiment
                emoji_url = result.path

                //  Actualizar los emoticones y los sentimiendos en consecuencia
                if (product  ==  'Smartphone'){
                    $('#m_emoji').attr('src' , emoji_url)
                    $('#m_emotion').text(emotion)
                    $('#m_emoji').show()
                    $('#m_emotion').show()
                }

                else if (product  ==  'Digital Camera'){
                    $('#c_emoji').attr('src' , emoji_url)
                    $('#c_emotion').text(emotion)
                    $('#c_emoji').show()
                    $('#c_emotion').show()
                }

                else if (product  ==  'Headphones'){
                    $('#h_emoji').attr('src' , emoji_url)
                    $('#h_emotion').text(emotion)
                    $('#h_emoji').show()
                    $('#h_emotion').show()
                }

                else if (product  ==  'Video Games'){
                    $('#v_emoji').attr('src' , emoji_url)
                    $('#v_emotion').text(emotion)
                    $('#v_emoji').show()
                    $('#v_emotion').show()
                }
            },

            //  Método error
            error : function(result)
            {
                console.log(result)
            }

        })

        console.log('Petición AJAX enviada.')
        
    }


    //  Verificar si el botón Enviar debajo de "smartphone" es presionado y obtener la reseña correspondiente
    $('#m_button').click(function(){

        review = $('#m_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Smartphone'
    })

    //  Verificar si el botón Enviar debajo de "cámara digital" es presionado y obtener la reseña correspondiente
    $('#c_button').click(function(){

        review = $('#c_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Digital Camera'
    })

    //  Verificar si el botón Enviar debajo de "audífonos" es presionado y obtener la reseña correspondiente
    $('#h_button').click(function(){

        review = $('#h_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Headphones'
    })

    //  cVerificar si el botón Enviar debajo de "videojuegos" es presionado y obtener la reseña correspondiente
    $('#v_button').click(function(){

        review = $('#v_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Video Games'
    })


    //  Si el botón Guardar es presionado, enviar una petición POST a la API

    $('#save_button').click(function(){

        console.log('El botón Guardar fue presionado.')

        //  Datos de entrada
        input_data = {'date' : date , 'product' : product , 'review' : review , 'sentiment' : emotion}

        //  Llamada AJAX
        $.ajax({
            type : 'POST',
            url : '/guardar',
            data : JSON.stringify(input_data),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                console.log(result)
            },
            error : function(result){
                console.log(result)
            }
        })

        // Limpiando las cajas de texto
        $('#m_textbox').val('')
        $('#c_textbox').val('')
        $('#h_textbox').val('')
        $('#v_textbox').val('')
    })


})

    
