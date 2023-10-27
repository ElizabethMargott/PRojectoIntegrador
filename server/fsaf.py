import os
import base64

def generate_secret_key(length=32):
    # Genera una clave secreta aleatoria
    random_bytes = os.urandom(length)
    
    # Convierte los bytes aleatorios a una cadena codificada en base64
    secret_key = base64.b64encode(random_bytes).decode('utf-8')
    
    return secret_key

# Ejemplo de uso
print(generate_secret_key())
