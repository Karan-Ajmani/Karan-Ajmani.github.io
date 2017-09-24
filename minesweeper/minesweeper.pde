class Cell{
 
  int x;
  int y;
  int w;
  int i;
  int j;
  boolean is_revealed;
  boolean has_mine;
  int num_neighbours = 0;
  
  Cell(int i, int j, int w){
   this.x = i*w;
   this.y = j*w;
   this.w = w;
   this.i = i;
   this.j = j;
   this.is_revealed = false;
   this.has_mine = false;
  }
  
  void show(){
    fill(255);
    stroke(0);
    rect(this.x, this.y, this.w, this.w);
    if (this.is_revealed) {
      if (this.has_mine){
         fill(51);
         ellipse(this.x + this.w/2, this.y + this.w/2, this.w*3/4, this.w*3/4);
      }
      else{
       if (this.num_neighbours > 0){
         textSize(20);
         fill(255,0,0);
         text(this.num_neighbours, this.x + this.w/4, this.y + this.w*3/4);
       }
       else{
        fill(220);
        rect(this.x, this.y, this.w, this.w);
       }
      }
    }
  }
  
}

int rows = 15;
int cols = 15;
int w = 30;
Cell[][] grid = new Cell[rows][cols];
int num_mines = 40;
int translate_o = 0;

void setup(){
  size(451,451);
  for (int i=0;i<rows;i++){
    for (int j=0;j<cols;j++){
      grid[i][j] = new Cell(i,j,w);
    }
  }
  
  for (int i=0;i<num_mines;i++){
    int row = int(random(rows));
    int col = int(random(cols));
    if (grid[row][col].has_mine == true)
      i--;
    else
      grid[row][col].has_mine=true;
  }
  
  for (int i=0;i<rows;i++){
    for (int j=0;j<cols;j++){
      int num = 0;
      for (int xoffset=-1;xoffset<=1;xoffset++){
        for (int yoffset=-1;yoffset<=1;yoffset++){
         if (i + xoffset >=0 && i + xoffset<rows && j + yoffset >=0 && j + yoffset < cols){
           if ( grid[i + xoffset][j + yoffset].has_mine )
             num++;
           }
        }
      }
      grid[i][j].num_neighbours = num;
    }
  }
  
}

void draw(){
  translate(translate_o,translate_o);
  for (int i=0;i<rows;i++){
    for (int j=0;j<cols;j++){
      grid[i][j].show();
    }
  } 
}

void floodfill(int i, int j){
 grid[i][j].is_revealed = true;
 for (int xoffset=-1;xoffset<=1;xoffset++){
   for (int yoffset=-1;yoffset<=1;yoffset++){
     if (i + xoffset >=0 && i + xoffset<rows && j + yoffset >=0 && j + yoffset < cols){
       if ( grid[i + xoffset][j + yoffset].num_neighbours == 0 && grid[i + xoffset][j + yoffset].is_revealed == false)
         floodfill(i + xoffset,j + yoffset);
       }
    }
  }
}

void mouseClicked() {
  if ( grid[int((mouseX - translate_o)/w)][int((mouseY - translate_o)/w)].has_mine ){
    for (int i=0;i<rows;i++){
      for (int j=0;j<cols;j++){
        grid[i][j].is_revealed = true;
      }
    }
  }
  else{
    if ( grid[int((mouseX - translate_o)/w)][int((mouseY - translate_o)/w)].num_neighbours > 0 )
      grid[int((mouseX - translate_o)/w)][int((mouseY - translate_o)/w)].is_revealed = true;
    else {
      int locali = int((mouseX - translate_o)/w);
      int localj = int((mouseY - translate_o)/w);
      floodfill(locali, localj);
    }
  } 
}

void replay(){
print("in here");
  rows = 15;
  cols = 15;
  w = 30;
  grid = new Cell[rows][cols];
  num_mines = 40;
  translate_o = 0;
  noLoop();
  setup();
  loop();
};
