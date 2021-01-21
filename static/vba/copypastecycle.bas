Attribute VB_Name = "Module1"
Sub CopyData()
'Updateby Extendoffice
Dim Rng As Range
Dim InputRng As Range, OutRng As Range
xTitleId = "KutoolsforExcel"
Set InputRng = Application.Selection
Set InputRng = Application.InputBox("Range :", xTitleId, InputRng.Address, Type:=8)
Set OutRng = Application.InputBox("Out put to (single cell):", xTitleId, Type:=8)
Set OutRng = OutRng.Range("A1")
For Each Rng In InputRng.Rows
    xValue = Rng.Range("A1").Value
    xNum = Rng.Range("B1").Value
    OutRng.Resize(xNum, 1).Value = xValue
    Set OutRng = OutRng.Offset(xNum, 0)
Next
End Sub
