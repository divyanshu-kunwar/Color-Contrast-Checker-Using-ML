from flask import render_template , Flask , request
import pandas as pd
import plotly.express as px

# create app
app = Flask ( __name__ , template_folder = 'templates' )

def update_plot():
    df = pd.read_csv("data/data.csv")
    # plot 3d scatter between R2-R1 , G2 - G2 , B2-B1 and color=is_liked
    df['R12'] = df['R2'] - df['R1']
    df['G12'] = df['G2'] - df['G1']
    df['B12'] = df['B2'] - df['B1']
    fig = px.scatter_3d(df, x='R12', y='G12', z='B12', color='is_liked' , template='plotly_dark')
    # hide color bar
    fig.update_layout(coloraxis_showscale=False)
    # some of the value is hidden so give it a little space
    fig.update_layout(margin=dict(l=0, r=0, b=0, t=0))
    fig.write_html("static/3ds.html")
    return


# simple app
@app.route ( '/' )
def index ():
    update_plot()
    return render_template ( 'index.html' )

@app.route('/add/' , methods = [ 'POST' ])
def add_data():
    data = request.get_json()

    str_data = str(data['R1']) + "," + str(data['R2']) + ","+ str(data['G1']) + "," + str(data['G2']) + ","+ str(data['B1']) + "," + str(data['B2']) + "," + str(data['action'])+"\n"
    try:
        f = open("data/data.csv", "a")
        f.write(str_data)
        f.close()
        print("data written to file")
    except:
        return "Error writing to file" , 500 
    
    return 'ok' , 200

# run app
if __name__ == '__main__' :
    app.run ( debug = True )