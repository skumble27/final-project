Attribute VB_Name = "Module11"
Sub StackColumns()
'UpdatebyExtendoffice20180814
Dim xSRg, xDRg As Range
Dim xDWS As Worksheet
Dim xIntDR, xIntDC, xI As Long
Dim xFNumR, xFNumC As Long
On Error GoTo Err1
Set xSRg = Application.InputBox("Select Columns:", "Kutools for Excel", xTxt, , , , , 8)
If xSRg Is Nothing Then
Err1:
    Application.ScreenUpdating = True
    Exit Sub
End If
Set xDRg = Application.InputBox("Select a cell to place result:", "Kutools for Excel", xTxt, , , , , 8)
If xDRg Is Nothing Then
    Exit Sub
End If
Application.ScreenUpdating = False
Set xDWS = xDRg.Worksheet
xIntDR = xDRg.Row
xIntDC = xDRg.Column
xI = 0
    For xFNumC = 1 To xSRg.Columns.Count
        For xFNumR = 1 To xSRg.Rows.Count
            Set xDRg = xDWS.Cells(xIntDR + xI, xIntDC)
            xDRg.Value = xSRg.Cells(xFNumR, xFNumC).Value
            xI = xI + 1
        Next xFNumR
    Next xFNumC
Application.ScreenUpdating = True

    Cells.Replace What:="..", Replacement:="0", LookAt:=xlPart, SearchOrder _
        :=xlByRows, MatchCase:=False, SearchFormat:=False, ReplaceFormat:=False _
        , FormulaVersion:=xlReplaceFormula2
End Sub
